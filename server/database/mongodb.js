import mongoose from 'mongoose';

async function connect() {
  await mongoose.connect(
    `mongodb+srv://supergod:supergod@cluster0.ae67vdd.mongodb.net/?retryWrites=true&w=majority`
  );
  console.log('MongoDB connection is successful');
}

export default connect;
