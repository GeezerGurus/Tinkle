const VideoSchema = require("../models/Video");

exports.addVideo = async (req, res) => {
  const userId = req.userId;
  const { title, creator, description, link, thumbnail } = req.body;

  try {
    if (!title || !creator || !link) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const video = VideoSchema({
        userId,
        title,
        creator,
        description,
        link,
        thumbnail
    });

    await video.save();
    res.status(200).json({ message: "Video Added" });
    console.log(video);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getVideo = async (req, res) => {
  try {
    const video = await VideoSchema.find().sort({ createdAt: -1 });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.patchVideo = async (req, res) => {
  const { videoId } = req.params;
  const { title, creator, description, link, thumbnail } = req.body;
  try {
        const video = await VideoSchema.findById({ _id: videoId });
        if (!video) {
            return res.status(404).json({ message: "Video not found!" });
        }

        if (title) video.title = title;
        if (creator) video.creator = creator;
        if (link) video.link = link;
        if (description) video.description = description;
        if (thumbnail) video.thumbnail = thumbnail;

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