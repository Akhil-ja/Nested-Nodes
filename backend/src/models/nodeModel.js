import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    default: null,
  },
});

const Node = mongoose.model('Node', nodeSchema);

export default Node;