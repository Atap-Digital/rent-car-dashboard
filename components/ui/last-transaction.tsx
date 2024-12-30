import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from './card';

interface LastTransactionProps {
  title: string;
  description: string;
  children?: React.ReactNode; // To allow customization of the CardContent section
}

const LastTransaction: React.FC<LastTransactionProps> = ({
  title,
  description,
  children
}) => {
  return (
    <Card className="flex max-h-[calc(109vh-200px)] flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        {children}
      </CardContent>
    </Card>
  );
};

export default LastTransaction;
