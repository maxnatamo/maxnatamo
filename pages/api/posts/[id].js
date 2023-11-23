import { getPost } from "@libs/blog";

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        const { header, content } = getPost(id);

        res.status(200).json({
            header: header,
            content: content
        });
    }
    catch(e) {
        res.status(404).end(e);
    }
}  