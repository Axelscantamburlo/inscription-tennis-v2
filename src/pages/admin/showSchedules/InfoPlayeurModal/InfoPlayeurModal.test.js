import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoPlayeurModal from './InfoPlayeurModal';

test('playeurInscription is never an empty array', () => {
    const mockPlayeurClick = 'John Doe';
    render(<InfoPlayeurModal playeurClick={mockPlayeurClick} />);
  
    // Vérifie que playeurInscription n'est jamais un array vide
    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.queryByText('Aucune inscription')).toBeNull();
  });