import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import NoteModel from '../models/note';
import { assertIsDefined } from '../util/assertIsDefined';

export const getNotes: RequestHandler = async (req, res, next) => {
  // res.send('Hello World!!');
  const authenticatedUserId = req.session.userId;

  try {
    // throw createHttpError(401);
    // throw Error('Baszinga!');
    assertIsDefined(authenticatedUserId);

    // const notes = await NoteModel.find({ userId: authenticatedUserId }).exec();
    const notes = await NoteModel.find({ userId: authenticatedUserId }).exec();
    // const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    console.log('first');
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  // Note: we don't need an interface for `getNote` because typescript knows that `noteId` is a string because it comes from the url
  const authenticatedUserId = req.session.userId;
  const noteId = req.params.noteId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You are not authorized to access this note');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Reyling on Mongoose Error Handling
// export const createNote: RequestHandler = async (req, res, next) => {
//   const title = req.body.title;
//   const text = req.body.text;

//   try {
//     const newNote = await NoteModel.create({
//       title: title,
//       text: text,
//     });

//     res.status(201).json(newNote);
//   } catch (error) {
//     next(error);
//   }
// };

// Custom error handling with http-errors package
interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!title) {
      throw createHttpError(400, 'Note must have a title');
    }

    const newNote = await NoteModel.create({
      userId: authenticatedUserId,
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }

    if (!newTitle) {
      throw createHttpError(400, 'Note must have a title');
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You are not authorized to access this note');
    }

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();
    // NoteModel.findByIdAndUpdate    // <=alternative option to get saved Note

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You are not authorized to access this note');
    }

    // await note.remove().exec();
    // alternative syntax `noteModel.findById` and then delete
    await NoteModel.findByIdAndRemove(noteId);

    // TODO: Add delete confirmation to response
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
