import { Breadcrumb } from "antd";

const DisplayBreadcrumb = ({ path }) => {
  const breadcrumbItems = path.map((item) => ({
    title: item.link ? <a href={item.link}>{item.title}</a> : item.title,
  }));

  return <Breadcrumb items={breadcrumbItems} />;
};

export default DisplayBreadcrumb;
