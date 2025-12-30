import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get("cid");
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    if (cid) {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('cid', cid)
        .single();
        
      if (error) throw error;
      if (!data) return NextResponse.json({ error: "Course not found" }, { status: 404 });
      
      const courseData = data.coursejson;
      courseData.cid = data.cid;
      courseData.id = data.id;
      if (data.bannerimageurl) {
        courseData.bannerImageUrl = data.bannerimageurl;
      }
      return NextResponse.json({ course: courseData });
    }
    
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('id', { ascending: false });
      
    if (error) throw error;
    
    return NextResponse.json({ 
      courses: (data || []).map(row => {
        const courseData = row.coursejson;
        courseData.cid = row.cid;
        courseData.id = row.id;
        if (row.bannerimageurl) {
          courseData.bannerImageUrl = row.bannerimageurl;
        }
        return courseData;
      })
    });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { course } = await req.json();
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const userEmail = course.userEmail || "demo@user.com";
    
    // Sanitize and validate fields
    const cid = course.cid || course.name;
    const name = course.name || "";
    const description = course.description || "";
    const noOfChapters = Number(course.noOfChapters) || 0;
    const includeVideo = !!course.includeVideo;
    const level = course.level || "";
    const category = course.category || "";
    const courseJson = course;
    const bannerImageUrl = course.bannerImageUrl || "";

    // Check for required fields
    if (!name || !level || !userEmail || !cid || !noOfChapters) {
      return NextResponse.json({ error: "Missing required course fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('courses')
      .insert({
        cid,
        name,
        description,
        noofchapters: noOfChapters,
        includevideo: includeVideo,
        level,
        category,
        coursejson: courseJson,
        useremail: userEmail,
        bannerimageurl: bannerImageUrl
      })
      .select('id')
      .single();
      
    if (error) throw error;
    
    return NextResponse.json({ success: true, courseId: data.id });
  } catch (error) {
    console.error("DB Insert Error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { cid } = await req.json();
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('cid', cid);
      
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 