import mongoose from "mongoose";
const { Schema, model } = mongoose;

const logSchema = new Schema({
  type: {
    type: String,
  },
  severity: {
    type: Number,
  },
  timestamp: {
    type: Number,
  },
  text: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Log = model("Log", logSchema);

export default Log;

/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       properties:
 *        type:
 *          type: string
 *          enum: [W, E, I]
 *        text:
 *          type: string
 *        severity:
 *           type: number
 *           minimum: 1
 *           maximum: 100
 *        timestamp:
 *           type: number
 *        user:
 *           $ref: '#/components/schemas/User'
 */
