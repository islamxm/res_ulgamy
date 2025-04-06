import { Paragraph, PatchType, TextRun } from "docx"
import patchDoc from "./patchDoc"
import { Distribution, Fraction } from "@/models"
import { _ranks } from "@/data/static"
import intToRome from "./intToRome"

type DocumentSepTemplates =
  'habarnama:aýlyk_tabşyryga_goýbermek' |
  'habarnama:gündelik_tabşyryga_goýbermek'

const docService = {
  monthDistribution(data: Distribution, fractions: Fraction[]) {
    const body = data.body
    const modified = body.map((b, bIndex) => {
      let fractionName = fractions.find(f => f.id === b.fractionId)?.name.shortName ?? ''
      let targets = b.data.map((f, fIndex) => {
        return ({
          title: `${fIndex + 1}. ${f.targets.join(', ')}`,
          body: f.data.map((p, pIndex) => `${pIndex + 1}. ${_ranks[p.rank?.rank || 'hatarcy']?.fullName} ${p.name.partial.lastName} ${p.name.partial.firstName}`)
        })
      })

      let body = {
        // порядковый номер подразделения надо перевести в римские цифры (intToRome)
        fractionName: `${intToRome(bIndex + 1)}. ${fractionName}`,
        targets
      }

      return body;
    })

    patchDoc({
      url: '/habarnama_aýlyk_tabşyryga_goýbermek.docx',
      patches: {
        template_date: {
          type: PatchType.PARAGRAPH,
          children: [
            new TextRun(data.date)
          ]
        },
        template_body: {
          type: PatchType.DOCUMENT,
          children: modified.map(f => ([
            new Paragraph({
              alignment: 'center',
              children: [
                new TextRun({
                  text: f.fractionName,
                  font: 'Times New Roman',
                  size: '14pt',
                  bold: true
                })
              ]
            }),
            
            ...f.targets.map(r => (
              [
                new Paragraph({
                  // text: r.title,
                  alignment: 'center',
                  children: [new TextRun({
                    text: r.title,
                    // break: 1,
                    font: 'Times New Roman',
                    size: '14pt',
                    bold: true
                  })]
                }),
                new Paragraph({
                  children: r.body.map((t,tIndex) => {
                    if(tIndex === 0) {
                      return new TextRun({
                        text: t,
                        font: 'Times New Roman',
                        size: '14pt'
                      })
                    } else {
                      return new TextRun({
                        text: t,
                        break: 1,
                        font: 'Times New Roman',
                        size: '14pt'
                      })
                    }
                    
                }) 
                })
                
              ]
            )).flat()
          ])).flat()
        }
        
      }
    })
  }
}

export default docService


