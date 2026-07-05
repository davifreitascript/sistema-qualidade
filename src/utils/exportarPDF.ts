import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { TesteTecido } from "../types/teste";
import { formatarData } from "./formatarData";

export function exportarPDF(testes: TesteTecido[]) {
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
            "Turma",
            "Artigo",
            "Gramatura",
            "BT Trama",
            "BT Urdume",
            "Res. Trama",
            "Res. Urdume",
            "Res. Reforço",
            "Controlista",
        ]],

        body: testes.map((teste, index) => [
            index + 1,
            teste.lote,
            formatarData(teste.data),
            teste.tear,
            teste.turma,
            teste.artigo,
            teste.gramatura,
            teste.batidaTrama,
            teste.batidaUrdume,
            teste.resistenciaTrama,
            teste.resistenciaUrdume,
            teste.resistenciaReforco,
            teste.controlista,
        ]),
        styles: {
            fontSize: 8,
            cellPadding: 2,
            halign: "center",
            valign: "middle"
        },
        headStyles: {
            fillColor: [203, 213, 225],
            textColor: [15, 23, 42],
            halign: "center",
            valign: "middle",
        },
    });

    doc.save("relatorio testes de tecido.pdf");
}