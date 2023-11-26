import {
  createServerComponentClient,
  createServerActionClient,
  createRouteHandlerClient
} from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'

const supabaseServer = createServerComponentClient({ cookies })
const supabaseSeverAction = createServerActionClient({ cookies })
const supabaseRouteHandler = createRouteHandlerClient({ cookies })

export { supabaseServer, supabaseSeverAction, supabaseRouteHandler }