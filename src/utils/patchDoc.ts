import { patchDocument, PatchDocumentOptions } from "docx";

const patchDoc = (url: string, patches: PatchDocumentOptions['patches'], cb: (file: Blob) => void) => {
  fetch(url)
  .then(response => {
    if(!response.ok) {
      console.log(`Error fetching from URL:${url}`)
    }
    return response.blob()
  })
  .then(blob => {
    const reader = new FileReader();
    reader.onload = function (event) {
        const arrayBufferData = event?.target?.result;
        patchDocument({
            // @ts-ignore
            data: arrayBufferData,
            outputType: 'arraybuffer',
            patches
            // patches: {
            //     my_patch: {
            //         type: PatchType.PARAGRAPH,
            //         children: [new TextRun("NEUER TITEL")],
            //     },
            //     my_second_patch: {
            //         type: PatchType.PARAGRAPH,
            //         children: [new TextRun("XX")],
            //     }
            // },
        }).then(finaldata => {
            const blob = new Blob([finaldata], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            cb(blob)
            // Now work with the data, e.g. download it.
            // const url = URL.createObjectURL(blob);
            // const link = document.createElement('a');
            // link.href = url;
            // link.download = 'output.docx';
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
            // URL.revokeObjectURL(url);
        });

    };

    reader.readAsArrayBuffer(blob)
  })
}

export default patchDoc