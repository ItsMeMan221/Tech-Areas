const postArticleValidation = (req, res, next) => {
  const { judul, gambar, isi, segmentasi_id } = req.body;
  const error = {
    success: true,
    error: {},
  };
  if (!judul) {
    error["success"] = false;
    error.error.judul = "Judul is required";
  } else if (judul.length < 10) {
    error["success"] = false;
    error.error.judul = "Title must be at least 10 characters";
  }
  if (!gambar) {
    error["success"] = false;
    error.error.gambar = "Image is required";
  }
  if (!isi) {
    error["success"] = false;
    error.error.isi = "Content is required";
  } else if (isi.length < 400) {
    error["success"] = false;
    error.error.isi = "Content should have more than 400 characters";
  }
  if (!segmentasi_id) {
    error["success"] = false;
    error.error.segmentasi_id = "Segmentasi id is required";
  }

  if (!error.success) {
    res.status(400).json(error);
  }
  return next();
};

export { postArticleValidation };
