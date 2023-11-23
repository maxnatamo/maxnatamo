import { getAllPosts } from "@libs/blog";

export default function handler(req, res) {
    res.status(200).json({ posts: getAllPosts() });
}