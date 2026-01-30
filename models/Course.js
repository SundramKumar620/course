import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'],
        unique: true,
        trim: true
    },
    description: { 
        type: String, 
        required: [true, 'Description is required']
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'],
        min: [0, 'Price must be non-negative']
    },
    thumbnail: { 
        type: String, 
        required: [true, 'Thumbnail is required']
    },
    creatorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin', 
        required: [true, 'Creator ID is required']
    }
}, {
    timestamps: true
});

export const Course = mongoose.model('Course', courseSchema);