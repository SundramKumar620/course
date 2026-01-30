import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'User ID is required']
    },
    course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', 
        required: [true, 'Course ID is required']
    },
    purchasedAt: { 
        type: Date, 
        default: Date.now 
    }
}, {
    timestamps: true
});

purchaseSchema.index({ user: 1, course: 1 }, { unique: true });

export const Purchase = mongoose.model('Purchase', purchaseSchema);