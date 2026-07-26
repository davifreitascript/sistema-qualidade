import type { TesteAlcas } from "../types/alcas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatarData } from "./formatarData"

export function exportarPDFAlcas(testes: TesteAlcas[]) {
    if (testes.length === 0) {
        alert("Nenhum teste para exportar.");
        return;
    }

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
    });

    doc.setFontSize(20);
    doc.text("Relatório de Testes de Tecido", 14, 15);

    autoTable(doc, {
        startY: 22,
        head: [[
            "N°",
            "Data",
            "Lote",
            "Tear",
            "Artigo",
            "Gramatura",
            "Batida Trama",
            "Responsável Teste",
        ]],

        body: testes.map((teste, index) => [
            index + 1,
            formatarData(teste.data),
            teste.lote,
            teste.tear,
            teste.artigo,
            teste.gramatura,
            teste.batidaTrama,
            teste.responsavelTeste,
        ]),
        styles: {
            fontSize: 8,
            cellPadding: 2,
            halign: "center",
            valign: "middle",
        },
        headStyles: {
            fillColor: [203, 213, 225],
            textColor: [15, 23, 42],
            halign: "center",
            valign: "middle"
        },
    });

    doc.save("relatorio testes de tecido.pdf");
}