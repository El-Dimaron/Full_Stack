import { Card, Divider, QRCode, Space, Typography } from "antd";
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

import "./contacts.scss";

const { Title, Paragraph, Text, Link } = Typography;

export function ContactsComponent() {
  const contactVCard = `
BEGIN:VCARD
VERSION:3.0
FN:Example Support
TEL:+380501234567
EMAIL:support@example.com
ADR:;Soborna Street 1-a;Kropyvnytskyi;;;Ukraine
END:VCARD
  `.trim();

  return (
    <section className="contacts-page">
      <div className="contacts-container">
        <div className="contacts-heading">
          <Title level={1}>Контакти</Title>

          <Paragraph className="contacts-paragraph">
            Ви можете зв'язатися з нами будь-яким зручним для вас способом.
          </Paragraph>
        </div>

        <Card className="contacts-card">
          <Space direction="vertical" size="large" className="contacts-list">
            <div className="contact-item">
              <MailOutlined className="contact-icon" />

              <div className="contact-content">
                <Text strong>Електронна адреса</Text>

                <Link href="mailto:support@example.com">support@example.com</Link>
              </div>
            </div>

            <div className="contact-item">
              <PhoneOutlined className="contact-icon" />

              <div className="contact-content">
                <Text strong>Телефон</Text>

                <Link href="tel:+380501234567">+38 (050) 123-45-67</Link>
              </div>
            </div>

            <div className="contact-item">
              <EnvironmentOutlined className="contact-icon" />

              <div className="contact-content">
                <Text strong>Адреса</Text>
                <Text>Кропивницький, вулиця Соборна, 1а</Text>
              </div>
            </div>
          </Space>

          <Divider />

          <div className="contact-qr">
            <Title level={4}>Save contact</Title>

            <Paragraph className="contacts-paragraph">Scan the QR code to add our contact to your phone.</Paragraph>

            <QRCode value={contactVCard} size={160} errorLevel="M" bgColor="#ffffff" color="#000000" />
          </div>
        </Card>
      </div>
    </section>
  );
}
