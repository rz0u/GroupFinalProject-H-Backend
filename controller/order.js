// model Order {
//     id              Int      @id @default(autoincrement())
//     userId          Int
//     user            User     @relation(fields: [userId], references: [id])
//     productId       Int
//     product         Product  @relation(fields: [productId], references: [id])
//     eventId         Int
//     event           Event    @relation(fields: [eventId], references: [id])
//     transactionDate DateTime
//     amount          Int
//     paymentStatus   String   @default("")
//     token           String   @default("")
//     snapUrl         String   @default("")
//     billCode        String
//   }
