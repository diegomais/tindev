import { type Document, Schema, model } from 'mongoose'

interface Dev extends Document {
  name: string
  user: string
  avatar: string
  bio?: string
  likes: Schema.Types.ObjectId[]
  dislikes: Schema.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const devSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    bio: String,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dev',
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dev',
      },
    ],
  },
  { timestamps: true }
)

export default model<Dev>('Dev', devSchema)
