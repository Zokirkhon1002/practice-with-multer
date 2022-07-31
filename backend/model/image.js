import mongoose from "mongoose";

let schema = new mongoose.Schema({
  picpath: {
    type: String,
  },
});

let picModel = mongoose.model('picsDemo',schema);

export default picModel;