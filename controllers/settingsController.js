const SettingSchema = require("../models/Setting");

exports.addSetting = async (req, res) => {
    const userId = req.userId;
    const { theme, default_interval, hide_dec } = req.body;

    try {
        if (!userId) {
            return res.status(400).json({ message: "All field required !" });
        }

        const setting = SettingSchema({
            userId,
            theme,
            default_interval,
            hide_dec
        });

        await setting.save();
        res.status(200).json({ message: "Setting Added" });
    } catch (error) {
        res.status(500).json({ message: error });

        console.log(setting);
    };
};

exports.getSettings = async (req, res) => {
    try {
      const setting = await SettingSchema.find({ userId: req.userId }).sort({ createdAt: -1 });
      res.status(200).json(setting);
    } catch (error) {
      res.status(500).json({ message: error });
    }
};

exports.getaSetting = async (req, res) => {
    const { settingId } = req.params;
    try {
      const setting = await SettingSchema.findOne({ userId: req.userId, _id: settingId});
      if (!setting) {
        return res.status(404).json({ message: "Setting not found!" });
      }
      res.status(200).json(setting)
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

exports.patchSetting = async (req, res) => {
    const { settingId } = req.params;
    const { theme, default_interval, hide_dec } = req.body;
    try {
          const setting = await SettingSchema.findOne({ userId: req.userId, _id: settingId });
          if (!setting) {
              return res.status(404).json({ message: "Setting not found!" });
          }
  
          if (theme) setting.theme = theme;
          if (default_interval) setting.default_interval = default_interval;
          if (hide_dec !== setting.hide_dec) setting.hide_dec = hide_dec;
          
          await setting.save();
  
          res.status(200).json({ message: "setting updated successfully", setting });
      } catch (error) {
          res.status(500).json({ message: error });
      }
}

exports.deleteSetting = async (req, res) => {
    const { settingId } = req.params;
    try {
      const setting = await SettingSchema.findOneAndDelete({ userId: req.userId, _id: settingId });
      if (!setting) {
        return res.status(404).json({ message: "Setting not found!" });
      }
      res.status(200).json({ message: "Setting Deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };