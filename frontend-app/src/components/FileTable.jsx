import React from 'react';

const FileTable = ({ files }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>Text</th>
                    <th>Number</th>
                    <th>Hex</th>
                </tr>
            </thead>
            <tbody>
                {files.map((file) =>
                    file.lines.map((line, idx) => (
                        <tr key={`${file.file}-${idx}`}>
                            <td>{file.file}</td>
                            <td>{line.text}</td>
                            <td>{line.number}</td>
                            <td>{line.hex}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default FileTable;
