import PocketBase from "pocketbase";

const pocketbase = new PocketBase("http://127.0.0.1:8090"); // Replace with your PocketBase URL

(async () => {
  try {
    const forumId = "hardkaex1q95kel"; // Replace with the actual forum_id
    const posts = await pocketbase
      .collection("posts")
      .getFullList(200 /* page size */, {
        filter: `forum_id = "${forumId}"`, // Filtering by forum_id
      });

    console.log("Posts for the forum:", posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
})();
