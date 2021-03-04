import { useState } from "react";
import { Container } from "semantic-ui-react";

const {
  default: EventDashboard,
} = require("../../features/events/eventDashboard/EventDashboard");
const { default: NavBar } = require("../../features/nav/NavBar");

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleSelectedEvent(event) {
    setSelectedEvent(event);
    setOpenForm(true);
  }

  function createEventForm() {
    setOpenForm(true);
    setSelectedEvent(null);
  }
  return (
    <>
      <h1>React Social App</h1>
      <NavBar setOpenForm={createEventForm} />
      <Container className="main">
        <EventDashboard
          openForm={openForm}
          setOpenForm={setOpenForm}
          selectedEvent={selectedEvent}
          setSelectedEvent={handleSelectedEvent}
        />
      </Container>
    </>
  );
}

export default App;
