import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Navbar,
  Nav,
  Tab,
  Row,
  Col,
  ListGroup,
  Modal,
  Button,
  Form,
} from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Wrench from 'bootstrap-icons/icons/wrench.svg';
import FolderFill from 'bootstrap-icons/icons/folder-fill.svg';
import GearFill from 'bootstrap-icons/icons/gear-fill.svg';
import Search from 'bootstrap-icons/icons/search.svg';
import Pencil from 'bootstrap-icons/icons/pencil.svg';
import Compass from 'bootstrap-icons/icons/compass.svg';
import FileCode from 'bootstrap-icons/icons/file-code.svg';

const Layout = ({ title, children }) => {
  const router = useRouter();
  const isActive = (routes) => !!routes.includes(router.pathname);

  return (
    <>
      <Head>
        <title>{title ? `${title} | ` : null}PocketMine 工具箱</title>
      </Head>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            PocketMine 工具箱
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link href="https://discord.gg/qPqrKAF" target="_blank">
                Discord
              </Nav.Link>
              <Nav.Link
                href="https://github.com/pmt-mcpe-fun/website"
                target="_blank"
              >
                GitHub
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Tab.Container>
          <Row>
            <Col md={3} className="mb-4">
              <ListGroup>
                <Link href="/create">
                  <ListGroup.Item active={isActive(['/', '/create'])}>
                    <Wrench width="1.25em" height="1.25em" /> 创建 <code>.phar</code>
                  </ListGroup.Item>
                </Link>
                <Link href="/extract">
                  <ListGroup.Item active={isActive(['/extract'])}>
                    <FolderFill width="1.25em" height="1.25em" /> 解包 <code>.phar</code>
                  </ListGroup.Item>
                </Link>
                <Link href="/inject">
                  <ListGroup.Item active={isActive(['/inject'])}>
                    <GearFill width="1.25em" height="1.25em" /> API 注入器
                  </ListGroup.Item>
                </Link>
                <Link href="/poggit-search">
                  <ListGroup.Item active={isActive(['/poggit-search'])}>
                    <Search width="1.25em" height="1.25em" /> Poggit 搜索
                  </ListGroup.Item>
                </Link>
                <Link href="/motd-generator">
                  <ListGroup.Item active={isActive(['/motd-generator'])}>
                    <Pencil width="1.25em" height="1.25em" /> MOTD 生成器
                  </ListGroup.Item>
                </Link>
                <Link href="/crashdump-parser">
                  <ListGroup.Item active={isActive(['/crashdump-parser'])}>
                    <Compass width="1.25em" height="1.25em" /> 崩溃转储解析器
                  </ListGroup.Item>
                </Link>
                <Link href="/pmf-decoder">
                  <ListGroup.Item active={isActive(['/pmf-decoder'])}>
                    <FileCode width="1.25em" height="1.25em" /> <code>.pmf</code> 解码器
                  </ListGroup.Item>
                </Link>
              </ListGroup>
            </Col>
            <Col md={9} className="mb-3">
              <Tab.Content>{children}</Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Layout;
