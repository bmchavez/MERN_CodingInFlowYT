// SHIFT ALT O
import { Container } from 'react-bootstrap';
// import { Note } from './models/note';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import styles from './styles/NotesPage.module.css';

function App() {
  // const [clickCount, setClickCount] = React.useState(0);

  // const [notes, setNotes] = useState<Note[]>([]);
  // const [notes, setNotes] = useState<NoteModel[]>([]);
  // const [notesLoading, setNotesLoading] = useState(true);
  // const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  // const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  // const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  // useEffect(() => {
  //   async function loadNotes() {
  //     try {
  //       setShowNotesLoadingError(false);
  //       setNotesLoading(true);

  //       // const response = await fetch('http://localhost:5000/api/notes', {
  //       // removed localhost portion because we added the proxy to the package.json
  //       // const response = await fetch('/api/notes', {
  //       //   method: 'GET',
  //       // });
  //       // const notes = await response.json();
  //       const notes = await NotesApi.fetchNotes();

  //       setNotes(notes);
  //     } catch (error) {
  //       console.error(error);

  //       // alert(error);
  //       setShowNotesLoadingError(true);
  //     } finally {
  //       setNotesLoading(false);
  //     }
  //   }

  //   loadNotes();
  // }, []);

  // async function deleteNote(note: NoteModel) {
  //   try {
  //     await NotesApi.deleteNote(note._id);
  //     setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
  //   } catch (error) {
  //     console.error(error);
  //     alert(error);
  //   }
  // }

  // const notesGrid = (
  //   <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
  //     {/* {JSON.stringify(notes)} */}
  //     {notes.map((note) => (
  //       // <Note note={note} key={note._id} />
  //       <Col key={note._id}>
  //         <Note
  //           note={note}
  //           className={styles.note}
  //           onNoteClicked={setNoteToEdit}
  //           // onNoteClicked={(note) => setNoteToEdit(note)}
  //           onDeleteNoteClicked={deleteNote}
  //         />
  //       </Col>
  //     ))}
  //   </Row>
  // );

  return (
    <>
      <NavBar
        loggedInUser={null}
        onLoginClicked={() => {}}
        onSignUpClicked={() => {}}
        onLogoutSuccessful={() => {}}
      />
      <Container className={styles.notesPage}>
        {/* <Button onClick={() => setClickCount(clickCount + 1)}>
          Clicked {clickCount} Times
        </Button> */}
        {/* <Button
          className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
          onClick={() => setShowAddNoteDialog(true)}
        >
          <FaPlus /> Add new note
        </Button>
        {notesLoading && <Spinner animation="border" variant="primary" />}
        {showNotesLoadingError && (
          <p>Something went wrong. Please refresh the page.</p>
        )}
        {!notesLoading && !showNotesLoadingError && (
          <>
            {notes.length > 0 ? (
              notesGrid
            ) : (
              <p>You don't have any notes yet.</p>
            )}
          </>
        )}

        {showAddNoteDialog && (
          <AddNoteDialog
            onDismiss={() => setShowAddNoteDialog(false)}
            onNoteSaved={(newNote) => {
              setNotes([...notes, newNote]);
              setShowAddNoteDialog(false);
            }}
          />
        )}
        {noteToEdit && (
          <AddEditNoteDialog
            noteToEdit={noteToEdit}
            onDismiss={() => setNoteToEdit(null)}
            onNoteSaved={(updatedNote) => {
              setNotes(
                notes.map((existingNote) =>
                  existingNote._id === updatedNote._id
                    ? updatedNote
                    : existingNote
                )
              );
              setNoteToEdit(null);
            }}
          />
        )} */}

        {false && (
          <SignUpModal onDismiss={() => {}} onSignUpSuccessful={() => {}} />
        )}

        {false && (
          <LoginModal onDismiss={() => {}} onLoginSuccessful={() => {}} />
        )}
      </Container>
    </>
  );
}

export default App;
