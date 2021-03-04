import { Image, List } from "semantic-ui-react";

export default function EventList({ attendee }) {
  return (
    <List.Item>
      <Image size="mini" circular src={attendee.photoURL} />
    </List.Item>
  );
}
