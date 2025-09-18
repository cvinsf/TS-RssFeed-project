import { fetchFeed } from "../lib/rss";

export async function handlerAgg(_: string) {
    const rssFeedURL = "https://www.wagslane.dev/index.xml"

    const dataFeed = await fetchFeed(rssFeedURL);
    const dataFeedStr = JSON.stringify(dataFeed, null, 2);
    console.log(dataFeedStr);

}