import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_rootParams } from "next/server";

const View = async ({ id }: { id: string }) => {
  /*  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  await writeClient.patch(id).inc({ views: 1 }).commit();
 */

  // Start both the fetch and increment at the same time
  const fetchPromise = client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });
  const incrementPromise = writeClient.patch(id).inc({ views: 1 }).commit();

  // Wait only for the fetch to complete so we can display the current value
  const { views: totalViews } = await fetchPromise;

  // Fire and forget the increment — no need to wait
  incrementPromise.catch((err) =>
    console.error("Failed to increment view count", err)
  );
  
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
