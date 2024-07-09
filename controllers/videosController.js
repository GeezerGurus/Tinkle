const VideoSchema = require("../models/Video");

exports.addVideo = async (req, res) => {
  const { title, creator, description, link, thumbnail, favourite } = req.body;

  try {
    if (!title || !creator || !link) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const video = VideoSchema({
        title,
        creator,
        description,
        link,
        thumbnail,
        favourite
    });

    await video.save();
    res.status(200).json({ message: "Video Added" });
    console.log(video);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const video = await VideoSchema.find().sort({ createdAt: -1 });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getaVideo = async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await VideoSchema.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found!" });
    }
    res.status(200).json(video)
  } catch {
    res.status(500).json({ message: error });
  }
};

exports.getFavouriteVideos = async (req, res) => {
  try { 
    const video = await VideoSchema.find({ userId: req.userId, favourite: true }).sort({ createdAt: -1 })
    res.status(200).jason(video);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchVideo = async (req, res) => {
  const { videoId } = req.params;
  const { title, creator, description, link, thumbnail, favourite } = req.body;
  try {
        const video = await VideoSchema.findOne({ _id: videoId });
        if (!video) {
            return res.status(404).json({ message: "Video not found!" });
        }

        if (req.userId) {
          video.userId = req.userId;
        } else {
          return res.status(401).json({ error: "Unauthorized" });
        }
        if (title) video.title = title;
        if (creator) video.creator = creator;
        if (link) video.link = link;
        if (description) video.description = description;
        if (thumbnail) video.thumbnail = thumbnail;
        if (favourite !== undefined) video.favourite = favourite;

        await video.save();

        res.status(200).json({ message: "Video updated successfully", Video });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.deleteVideo = async (req, res) => {
  const { videoId } = req.params;
  VideoSchema.findOneAndDelete({ _id:videoId })
    .then((video) => {
      res.status(200).json({ message: "Video Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};