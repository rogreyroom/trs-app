// -> click URLOP OKOLICZNOŚCIOWY {__*5*7__}
//       * otwiera się okno z formularzem do dodania / edycji urlopu okolicznościowego
//           (
//             w oknie widoczne są:
//         - formularz z następującymi polami:
//               [
//           - data startu/rozpoczęcia
//           - data końca/zakończenia
//               ]
//         - przycisk Anuluj (czyści formularz i przechodzi do panelu pracownika) __*5*7*1__
//         - przycisk Zapisz (zapisuje dane w bazie, czyści formularz i przechodzi do panelu pracownika) __*5*7*2__
//           )

const LeavePage = ({ employee }) => {
  return (
    <>
      <h1>Leave sub page</h1>
      <p>Employee: { employee }</p>
    </>
  )
}

export default LeavePage