// -> click RAPORT {__*5*9__}
// * otwiera się okno z raportem dla pracownika
//     (
//       w oknie widoczne są:
//   - formularz z następującymi polami:
//         [
//     - /dane przedstawiane - do ustalenia/
//         ]
//   - przycisk Anuluj (czyści formularz i przechodzi do panelu pracownika) __*5*9*1__
//   - przycisk Zapisz (zapisuje dane w bazie, czyści formularz i przechodzi do panelu pracownika) __*5*9*2__
//     )

import { Title } from "@/common/Title"

const ReportsPage = ({ employee }) => {
  return (
    <>
      <Title isWhite>Reports sub page</Title>
      <p>Employee: { employee }</p>
      <p>Link list of all employee reports</p>
    </>
  )
}

export default ReportsPage
