import { db } from "../config/db.js";

const getArticle = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      let page = parseInt(req.query.page) || 1;
      const totalRecords = await db("artikel")
        .count("* as total_records")
        .where("status_id", 2);
      const limit = 5;
      const totalPages = Math.ceil(totalRecords[0].total_records / limit);
      if (page > totalPages) {
        page = totalPages;
      }
      const offset = (page - 1) * limit;
      const articles = await db
        .select(
          "a.id",
          "a.judul",
          "a.isi",
          "a.gambar",
          "a.tanggal_dibuat",
          "da.nama as pembuat",
          "s.description as segmentasi"
        )
        .from("artikel as a")
        .leftJoin("detail_admin as DA", "a.admin_id", "=", "da.id_admin")
        .leftJoin("segmen as s", "a.segmentasi_id", "=", "s.id")
        .where("a.status_id", 2)
        .limit(limit)
        .offset(offset)
        .orderBy("a.tanggal_dibuat", "desc");
      return res
        .status(200)
        .json({ success: true, data: articles, page, totalPages });
    } else if (id) {
      const articleById = await db
        .select(
          "a.id",
          "a.judul",
          "a.isi",
          "a.gambar",
          "a.tanggal_dibuat",
          "da.nama as pembuat",
          "s.description as segmentasi"
        )
        .from("artikel as a")
        .leftJoin("detail_admin as DA", "a.admin_id", "=", "da.id_admin")
        .leftJoin("segmen as s", "a.segmentasi_id", "=", "s.id")
        .where("a.id", id);
      return res.status(200).json({ success: true, data: articleById });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { getArticle };
