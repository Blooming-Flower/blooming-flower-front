import html2canvas from "html2canvas";
import jsPDF from "jspdf"

// export const makePdf = (fileName:string) => {
//     const convertToImg = async () => {
//         // html to imageFile
//         const paper:any = document.querySelector(".div_container > .pdf_container");
//         return await html2canvas(paper,{scale:3});
//     }
//     return {
//         viewWithPdf: async () => {
//             // html to imageFile
//             const imageFile = await convertToImg()
//             // document.write('<img src="'+imageFile+'" />');
//             // imageFile to Pdf
//             const pdf = convertToPdf(imageFile)
//         }
//     }
// }
export const viewWithPdf = async (fileName:string, type:string) => {
    // html to imageFile
    const imageFile = await convertToImg()
    // document.write('<img src="'+imageFile+'" />');
    // imageFile to Pdf
    return convertToPdf(imageFile, fileName,type)
}
const convertToImg = async () => {
    // html to imageFile
    const paper:any = document.querySelector(".div_container > .pdf_container");
    return await html2canvas(paper,{scale:2.5});
}
const convertToPdf = (canvas:HTMLCanvasElement, fileName:string,type:string) => {
    //1.이미지화
    const imageFile = canvas.toDataURL('image/png');
    //2.pdf준비
    const doc = new jsPDF('p', 'mm', 'a4');
    //pdf 가로 세로 사이즈
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    //이미지의 길이와 pdf의 가로길이가 다르므로 이미지 길이를 기준으로 비율을 구함
    const widthRatio = pageWidth / canvas.width;
    //비율에 따른 이미지 높이
    const customHeight = canvas.height * widthRatio;
    //pdf에 1장에 대한 이미지 추가
    doc.addImage(imageFile, 'JPEG', 0, 0, pageWidth, customHeight);
    //doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    //감소하면서 남은 길이 변수
    let heightLeft = customHeight;
    //증가하면서 이미지 자를 위치 변수
    let heightAdd = -pageHeight;
    // 한 페이지 이상일 경우
    while (heightLeft >= pageHeight) {
        //pdf페이지 추가
        doc.addPage();
        //남은 이미지를 추가
        doc.addImage(imageFile, 'JPEG', 0, heightAdd, pageWidth, customHeight);
        //남은길이
        heightLeft -= pageHeight;
        //남은높이
        heightAdd -= pageHeight;
    }

    
    //문서미리보기
    switch(type){
        case 'preview':
            window.open(doc.output("bloburl"))
            break
        case 'down':
            doc.save(fileName);
            break
    }
    // document.write('<img src="'+imageFile+'" />');
    const pdf = new File([doc.output("blob")], "test.pdf", {
        type: "application/pdf",
    });

    return pdf
}