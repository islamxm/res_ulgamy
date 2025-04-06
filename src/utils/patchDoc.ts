import { patchDocument, PatchDocumentOptions } from "docx";


export const patchDoc = async ({
  url,
  patches,
  documentName = 'test',
  cb
}: {
  url: string,
  patches: PatchDocumentOptions['patches'],
  documentName?: string
  cb?: (file: Blob) => void
}) => {
  let response = await fetch(url)
  if (!response.ok) {
    console.log(`Error fetching from URL:${url}`)
  }
  const reader = new FileReader();
  const blob = await response.blob()

  reader.onload = function (event) {
    const arrayBufferData = event?.target?.result;
    patchDocument({
      // @ts-ignore
      data: arrayBufferData,
      outputType: 'arraybuffer',
      patches
    }).then(finaldata => {
      const blob = new Blob([finaldata], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      cb && cb(blob)
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${documentName}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };
  reader.readAsArrayBuffer(blob)
}

// const patchDoc = (url: string, patches: PatchDocumentOptions['patches'], cb: (file: Blob) => void) => {
//   fetch(url)
//   .then(response => {
//     if(!response.ok) {
//       console.log(`Error fetching from URL:${url}`)
//     }
//     return response.blob()
//   })
//   .then(blob => {
//     const reader = new FileReader();
//     reader.onload = function (event) {
//         const arrayBufferData = event?.target?.result;
//         patchDocument({
//             // @ts-ignore
//             data: arrayBufferData,
//             outputType: 'arraybuffer',
//             patches
//             patches: {
//                 my_patch: {
//                     type: PatchType.PARAGRAPH,
//                     children: [new TextRun("NEUER TITEL")],
//                 },
//                 my_second_patch: {
//                     type: PatchType.PARAGRAPH,
//                     children: [new TextRun("XX")],
//                 }
//             },
//         }).then(finaldata => {
//             const blob = new Blob([finaldata], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
//             cb(blob)
//             Now work with the data, e.g. download it.
//             const url = URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.download = 'output.docx';
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//             URL.revokeObjectURL(url);
//         });

//     };

//     reader.readAsArrayBuffer(blob)
//   })
// }

export default patchDoc