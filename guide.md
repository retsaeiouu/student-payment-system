1. `docker compose up -d db` RUN MO AS ADMIN PAG DI GUMANA

2. PUNTA KA SA `source` AT RUN MO `npx prisma db push && npx prisma db seed`

3. PAGPALITIN MO YUNG `DATABASE_URL` SA `.env`, TANGGALIN MO LANG YUNG `#` SA ISA AT ILAGAY MO SA ISA

4. RUN MO `docker compose down db` AT `docker compose up` (WAG MO PAGSABAYIN AH, HINTAYING MO MAG STOP)

5. PUNTA KA http:localhost:3000 AT PAGDASAL MO NALANG GUMANA

admin account
email: admin@gmail.com
password: admin
