import { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../eventForm/EventForm";
import { sampleData } from "../../../app/api/sampleData";
export default function EventDashboard({
  openForm,
  setOpenForm,
  selectedEvent,
  setSelectedEvent,
}) {
  const [events, setEvents] = useState(sampleData);
  function createEvent(eventDataForm) {
    setEvents([...events, eventDataForm]);
  }
  function updateEvent(updateEvent) {
    setEvents(
      events.map((event) => (event.id === updateEvent.id ? updateEvent : event))
    );
  }
  function deleteEvent(deleteEvent) {
    setEvents(events.filter((event) => event.id !== deleteEvent.id));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          setSelectedEvent={setSelectedEvent}
          deleteEvent={deleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {openForm && (
          <EventForm
            selectedEvent={selectedEvent}
            setOpenForm={setOpenForm}
            createEvent={createEvent}
            updateEvent={updateEvent}
            key={selectedEvent ? selectedEvent.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
