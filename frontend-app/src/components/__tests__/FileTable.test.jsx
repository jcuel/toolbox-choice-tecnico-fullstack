import { render, screen } from '@testing-library/react';
import FileTable from '../FileTable';

const mockFiles = [
    {
        file: 'test.csv',
        lines: [
            { text: 'Hello', number: 123, hex: 'abc123def456abc789abc123def456aa' }
        ]
    }
];

test('renders file data in table', () => {
    render(<FileTable files={mockFiles} />);
    expect(screen.getByText('test.csv')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
});
