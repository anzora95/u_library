const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  book: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book', 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  loanDate: { type: Date, default: Date.now },
  dueDate: { 
    type: Date, 
    required: true,
    default: () => new Date(+new Date() + 14*24*60*60*1000) 
  },
  returnDate: { type: Date },
  status: { 
    type: String, 
    enum: ['active', 'returned', 'overdue'], 
    default: 'active' 
  },
  createdAt: { type: Date, default: Date.now }
});

LoanSchema.pre('save', async function(next) {
  if (this.isNew) {
    const Book = mongoose.model('Book');
    await Book.findByIdAndUpdate(this.book, { $inc: { availableCopies: -1 } });
  }
  next();
});

module.exports = mongoose.model('Loan', LoanSchema);