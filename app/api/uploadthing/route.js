import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./coreuploadthing";
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
router: ourFileRouter,
});