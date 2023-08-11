import { Enquery } from "@/lib/enquerySchema";

export async function POST(req: Request) {
    const body = await req.json();
    
    return new Response(JSON.stringify(body), {status: 200})
}
