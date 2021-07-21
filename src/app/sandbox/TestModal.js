import ModalWrapper from '../common/modals/ModalWrapper'

export default function TestModal({ data }) {
  return (
    <ModalWrapper size="mini" header={<h2>TestModal</h2>}>
      <div>TestModal is working</div>
      <p>this is any dynamic data you pass:{data}</p>
    </ModalWrapper>
  )
}
