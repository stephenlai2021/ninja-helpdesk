import {
  createClientComponentClient,
  createServerComponentClient,
  createServerActionClient,
  createRouteHandlerClient,
  createMiddlewareClient
} from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'

const supabaseClient = createClientComponentClient()
const supabaseServer = createServerComponentClient({ cookies })
const supabaseSeverAction = createServerActionClient({ cookies })
const supabaseRouteHandler = createRouteHandlerClient({ cookies })
const supabaseMiddleware = createMiddlewareClient()

export { supabaseClient, supabaseServer, supabaseSeverAction, supabaseRouteHandler, supabaseMiddleware }
// export { supabaseClient, supabaseServer, supabaseSeverAction, supabaseRouteHandler }