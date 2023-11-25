import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { supabaseMiddleware } from '@/config/supabase'
import { NextResponse } from 'next/server'

export async function middleware(req, res) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}