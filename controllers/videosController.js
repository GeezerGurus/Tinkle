const VideoSchema = require("../models/Video");

exports.addVideo = async (req, res) => {
  const { title, creator, description, link, category, thumbnail, favourite } = req.body;

  try {
    if (!title || !creator || !link) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const video = VideoSchema({
        title,
        creator,
        description,
        link,
        category,
        thumbnail
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
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getFavouriteVideos = async (req, res) => {
  try { 
    const video = await VideoSchema.find({ userId: req.userId, favourite: true }).sort({ createdAt: -1 })
    if (!video) {
      return res.status(404).json({ message: "Video not found!" });
    }    
    return res.status(200).json(video);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

exports.addFavouriteVideo = async (req, res) => {
  const { videoId } = req.params;
  try {
        const video = await VideoSchema.findOne({ _id: videoId });
        if (!video) {
            return res.status(404).json({ message: "Video not found!" });
        }
        
        const favourite_video = VideoSchema({
          userId: req.userId,
          title: video.title,
          creator: video.creator,
          description: video.description,
          link: video.link,
          category: video.category,
          thumbnail: video.thumbnail,
          favourite: true,
      });
  
      await favourite_video.save();
      res.status(200).json({ message: "Favourite video Added" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.deleteFavouriteVideo = async (req, res) => {
  const { videoId } = req.params;
  VideoSchema.findOneAndDelete({ userId: req.userId, _id:videoId })
    .then((video) => {
      res.status(200).json({ message: "Video Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

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