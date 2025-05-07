import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubCategorySchema = new Schema({
    subcategory_id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    icon_url: { type: String, default: '' },
});

const CategorySchema = new Schema({
    category_id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    icon_url: { type: String, default: '' },
    subcategories: { type: [SubCategorySchema], default: [] },
}, { timestamps: true });

CategorySchema.index({ 'category_id': 1 }, { unique: true });
CategorySchema.index({ 'name': 1 });
CategorySchema.index({ 'subcategories.subcategory_id': 1 });

const Interest = mongoose.model('Interest', CategorySchema);

export default Interest;
