import html2canvas from "html2canvas";
import jsPDF from "jspdf"

export const makePdf = (fileName:string) => {
    const convertToImg = async () => {
        // html to imageFile
        const paper:any = document.querySelector(".div_container > .pdf_container");
        return await html2canvas(paper,{scale:4});
    }

    const convertToPdf = (canvas:HTMLCanvasElement) => {
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
debugger
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
        //문서저장
        doc.save(fileName);
        // window.open(doc.output("bloburl"))
        // document.write('<img src="'+imageFile+'" />');
        const pdf = new File([doc.output("blob")], "test.pdf", {
            type: "application/pdf",
        });

        return pdf
    }

    return {
        viewWithPdf: async () => {
            // html to imageFile
            const imageFile = await convertToImg()
            // document.write('<img src="'+imageFile+'" />');
            // imageFile to Pdf
            const pdf = convertToPdf(imageFile)
        }
    }
}

export const onDownloadBtn = () => {
    const paper:any = document.querySelector(".div_container > .pdf_container");
    html2canvas(paper,{
        allowTaint : true,	// cross-origin allow
        useCORS: true,		// CORS 사용한 서버로부터 이미지 로드할 것인지 여부
        scale : 2			// 기본 96dpi에서 해상도를 두 배로 증가

    }).then(function(canvas) {
        // 캔버스를 이미지로 변환
        let imgData = canvas.toDataURL('image/png');
        let imgWidth = 120; // 이미지 가로 길이(mm) / A4 기준 210mm
        let pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
        let imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let margin = 45; // 출력 페이지 여백설정
        let doc = new jsPDF('p', 'mm');
        let position = 10;

        // 첫 페이지 출력
        doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // 한 페이지 이상일 경우 루프 돌면서 출력
        while (heightLeft >= 20) {
            position = heightLeft - imgHeight;
            position = position - 20 ;
            doc.addPage();
            doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // 파일 저장
        doc.save('sample.pdf');
        document.write('<img src="'+imgData+'" />');
    });
};