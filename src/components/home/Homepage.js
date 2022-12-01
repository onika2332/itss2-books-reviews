
import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

function Homepage() {

    return (
        <Layout>
          <Sider trigger={null}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1',
                  label: 'nav 1',
                },
                {
                  key: '2',
                  label: 'nav 2',
                },
                {
                  key: '3',
                  label: 'nav 3',
                },
              ]}
            />
          </Sider>
          <Layout className="site-layout">
            <Header 
                className="site-layout-background"
                style={{ padding: 0 }} 
            />
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              Here, list of book
            </Content>
          </Layout>
        </Layout>
      );
} 
export default Homepage;