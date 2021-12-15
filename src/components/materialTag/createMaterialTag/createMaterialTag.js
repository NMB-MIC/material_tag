import React, { Component } from 'react';
import ReactToPrint from "react-to-print";
// import QRCode from "react-qr-code";
import QRCode from 'qrcode.react';
import Zoom from 'react-medium-image-zoom'
import XLSX from 'xlsx';
import { JsonToExcel } from 'react-json-excel';
import 'react-medium-image-zoom/dist/styles.css'
// import './createMaterialTag.css'
import Swal from 'sweetalert2';

const make_cols = refstr => {
  let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
  return o;
};

class ComponentToPrint extends Component {
  printData = this.props.printData

  limitStr = (str, limit) => {
    str = str.toString()
    return str.substring(0, limit)
  }

  render() {
    return (
      <div className="print-container" style={{ margin: "0", padding: "0" }}>
        {this.printData.map(printItem => (
          <>
            <div style={{ width: '100mm', height: '60mm', borderStyle: 'solid' }}>
              <div style={{ height: '5.9mm', width: '100mm', textAlign: 'center', float: 'left' }}>
                <label style={{ fontSize: '5mm', }}><b>Material receiving tag</b></label>
              </div>
              <div style={{ textAlign: 'left', width: '100mm', height: '6mm', float: 'left' }}>
                <label style={{ width: '48m', fontSize: '4mm', marginLeft: '1mm', padding: 0 }}>Supplier Code : {printItem.supplierCode}</label>
                <label style={{ textAlign: 'right', width: '48mm', marginRight: '2mm', fontSize: '4mm', padding: 0, marginLeft: '1mm' }}>Division Code : {printItem.divisionCode}</label>
              </div>
              <div style={{ textAlign: 'left', width: '100mm', marginLeft: '1mm', height: '6mm', float: 'left' }}>
                <label style={{ fontSize: '3.25mm', padding: 0 }}>Supplier Name : {this.limitStr(printItem.supplierName, 38)}</label>
              </div>

              <div style={{ width: '100mm', float: 'left', fontSize: '4.055mm' }}>
                <div style={{ borderStyle: 'solid', width: '30mm', borderWidth: '1px', marginLeft: '1mm', float: 'left' }}>
                  <div style={{ borderStyle: 'solid', borderWidth: '1px' }}>PO No.</div>
                  <div style={{ borderStyle: 'solid', borderWidth: '1px' }}>DO/Invoice No.</div>
                  <div style={{ borderStyle: 'solid', borderWidth: '1px' }}>Quantity</div>
                  <div style={{ borderStyle: 'solid', borderWidth: '1px' }}>Item number</div>
                  <div style={{ borderStyle: 'solid', borderWidth: '1px' }}>Item Name</div>
                  <div style={{ borderStyle: 'solid', borderWidth: '1px' }}>MFG Lot No.</div>
                </div>
                <div style={{ borderStyle: 'solid', borderWidth: '1px', width: '43mm', float: 'left' }}>
                  <div style={{ marginLeft: '-0.5mm', marginRight: '-0.5mm', borderStyle: 'solid', borderWidth: '1px', paddingLeft: '1mm' }}>{this.limitStr(printItem.purchaseOrder, 18)}</div>
                  <div style={{ marginLeft: '-0.5mm', marginRight: '-0.5mm', borderStyle: 'solid', borderWidth: '1px', paddingLeft: '1mm' }}>{this.limitStr(printItem.deliveryOrder, 18)}</div>
                  <div style={{ marginLeft: '-0.5mm', marginRight: '-0.5mm', borderStyle: 'solid', borderWidth: '1px', paddingLeft: '1mm' }}>{this.limitStr(printItem.quantity + ' ' + printItem.unit, 18)}</div>
                  <div style={{ marginLeft: '-0.5mm', marginRight: '-0.5mm', borderStyle: 'solid', borderWidth: '1px', paddingLeft: '1mm' }}>{this.limitStr(printItem.itemNumber, 18)}</div>
                  <div style={{ marginLeft: '-0.5mm', marginRight: '-0.5mm', borderStyle: 'solid', borderWidth: '1px', paddingLeft: '1mm' }}>{this.limitStr(printItem.itemName, 18)}</div>
                  <div style={{ marginLeft: '-0.5mm', marginRight: '-0.5mm', borderStyle: 'solid', borderWidth: '1px', paddingLeft: '1mm' }}>{this.limitStr(printItem.mfgLot, 18)}</div>
                </div>
                <div style={{ borderStyle: 'solid', width: '24mm', borderWidth: '2px', float: 'left' }}>
                  <div style={{ textAlign: 'center', padding: '1mm' }}>
                    <Zoom>
                      <QRCode
                        size={80}
                        renderAs='svg'
                        // imageSettings={{ height: 7, width: 7, excavate: true }}
                        value={
                          `${printItem.boxID}\t${printItem.divisionCode}\t${printItem.purchaseOrder}\t${printItem.deliveryOrder}\t${printItem.quantity}\t${printItem.supplierCode}\t${printItem.supplierName}\t${printItem.itemNumber}\t${printItem.itemName}`} />
                    </Zoom>
                  </div>
                  <div style={{ borderTop: 'solid 2px', width: '23mm', height: '13.15mm', textAlign: 'center' }}>
                    <b style={{ fontSize: '3mm' }}>RoHs</b>
                  </div>
                </div>
              </div>


            </div>
            <div className="page-break" />
          </>
        ))
        }
      </div>
    );
  }
}

class CreateMaterialTag extends Component {

  constructor(props) {
    super(props)

    this.state = {
      printData: [],
      boxID: '',
      divisionCode: '',
      purchaseOrder: '',
      deliveryOrder: '',
      quantity: 0,
      unit: 'pcs',
      supplierCode: '',
      supplierName: '',
      itemNumber: '',
      itemName: '',
      mfgLot: '',
      // control1: '',
      // control2: '',
      // control3: '',

      //Excel
      file: {},
      data: [],
      cols: [],
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await require("./createMaterialTag.css");
    this.forceUpdate()
  }

  loadingScreen(data) {
    if (data === null) {
      return (
        <div className="overlay">
          <i className="fas fa-3x fa-sync-alt fa-spin" />
          <div className="text-bold pt-2">Loading...</div>
        </div>
      );
    }
  }

  addTag = () => {
    let printData = this.state.printData;
    printData.push({
      boxID: this.state.boxID,
      divisionCode: this.state.divisionCode,
      purchaseOrder: this.state.purchaseOrder,
      deliveryOrder: this.state.deliveryOrder,
      quantity: this.state.quantity,
      unit: this.state.unit,
      supplierCode: this.state.supplierCode,
      supplierName: this.state.supplierName,
      itemNumber: this.state.itemNumber,
      itemName: this.state.itemName,
      mfgLot: this.state.mfgLot,
      // control1: this.state.control1,
      // control2: this.state.control2,
      // control3: this.state.control3,
    })
    console.log(printData);
    this.setState({ printData })
  }

  renderTagInput = () => {
    return (
      <div className='row'>
        <div className='col-sm-6'>
          <div className="form-group">
            <label >Box ID:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter box id"
              value={this.state.boxID}
              onChange={(e) => { this.setState({ boxID: e.target.value }) }} />
          </div>
        </div>
        <div className='col-sm-6'>
          <div className="form-group">
            <label >Division Code:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter division code"
              value={this.state.divisionCode}
              onChange={(e) => { this.setState({ divisionCode: e.target.value }) }} />
          </div>
        </div>
        <div className='col-sm-6'>
          <div className="form-group">
            <label >Purchase Order(PO) No.:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter purchase order"
              value={this.state.purchaseOrder}
              onChange={(e) => { this.setState({ purchaseOrder: e.target.value }) }} />
          </div>
        </div>
        <div className='col-sm-6'>
          <div className="form-group">
            <label >Invoice No./ Delivery Order(DO) No.:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter delivery order"
              value={this.state.deliveryOrder}
              onChange={(e) => { this.setState({ deliveryOrder: e.target.value }) }} />
          </div>
        </div>
        <div className='col-sm-6'>
          <div className="form-group">
            <label >Supplier Code:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter supplier code"
              value={this.state.supplierCode}
              onChange={(e) => { this.setState({ supplierCode: e.target.value }) }} />
          </div>
        </div>
        <div className='col-sm-6'>
          <div className="form-group">
            <label>Supplier Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter spplier name"
              value={this.state.supplierName}
              onChange={(e) => { this.setState({ supplierName: e.target.value }) }} />
          </div>
        </div>
        <div className='col-sm-6'>
          <div className="form-group">
            <label>Item Number:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter item number"
              value={this.state.itemNumber}
              onChange={(e) => { this.setState({ itemNumber: e.target.value }) }} />
          </div>
        </div>
        <div className='col-sm-6'>
          <div className="form-group">
            <label>Item Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter item name"
              value={this.state.itemName}
              onChange={(e) => { this.setState({ itemName: e.target.value }) }} />
          </div>
        </div>
        <div className='col-sm-3'>
          <div className="form-group">
            <label >Quantity(Qty):</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter purchase order"
              value={this.state.quantity}
              onChange={(e) => { this.setState({ quantity: e.target.value }) }} />
          </div>
        </div>
        <div className='col-sm-3'>
          <div className="form-group">
            <label >Unit:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter purchase order"
              value={this.state.unit}
              onChange={(e) => { this.setState({ unit: e.target.value }) }} />
          </div>
        </div>
        <div className='col-sm-6'>
          <div className="form-group">
            <label >MFG Lot:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter MFG Lot Number"
              value={this.state.mfgLot}
              onChange={(e) => { this.setState({ mfgLot: e.target.value }) }} />
          </div>
        </div>
        {/* <div className='col-sm-4'>
          <div className="form-group">
            <label >Control 1 (Optional):</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter MFG Lot Number"
              value={this.state.control1}
              onChange={(e) => { this.setState({ control1: e.target.value }) }} />
          </div>
        </div>
        <div className='col-sm-4'>
          <div className="form-group">
            <label >Control 2 (Optional):</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter MFG Lot Number"
              value={this.state.control2}
              onChange={(e) => { this.setState({ control2: e.target.value }) }} />
          </div>
        </div>
        <div className='col-sm-4'>
          <div className="form-group">
            <label >Control 3 (Optional):</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter MFG Lot Number"
              value={this.state.control3}
              onChange={(e) => { this.setState({ control3: e.target.value }) }} />
          </div>
        </div> */}
      </div>
    )
  }

  renderPrintTab = () => {
    if (this.state.printData.length > 0) {
      return (
        <div className='card card-success'>
          <div className='card-header'>
            <h1 class="card-title">Print sample</h1>
            <button className='btn btn-primary float-right'>
              <ReactToPrint
                trigger={() => <a href="#">Print this out!</a>}
                content={() => this.componentRef}
              />
            </button>
          </div>
          <div className='card-body'>
            <ComponentToPrint printData={this.state.printData} ref={el => (this.componentRef = el)} />
          </div>
        </div>
      )
    }
  }

  //Excel
  handleChange(e) {

    const files = e.target.files;
    if (files && files[0]) {
      document.getElementById("fileLable").innerHTML = e.target.files[0].name;
      this.setState({ file: files[0] });
    }
  };

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = async (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = await XLSX.utils.sheet_to_json(ws);
      /* Update state */
      // this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
      //   console.log(this.state.data);
      // });

      //check
      try {
        if (data[0]["Box ID"] == undefined) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Mistake template format, Please download template files',
          })
          return
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Mistake template format, Please download template file',
        })
        return
      }

      let printData = this.state.printData;
      data.forEach(async item => {
        await printData.push({
          boxID: item["Box ID"],
          divisionCode: item['Division Code'],
          purchaseOrder: item["Purchase Order"],
          deliveryOrder: item["Invoice No./ Delivery Order(DO) No."],
          quantity: item["Quantity"],
          unit: item["Unit"],
          supplierCode: item["Supplier Code"],
          supplierName: item["Supplier Name"],
          itemNumber: item["Item Number"],
          itemName: item["Item Name"],
          mfgLot: item["MFG Lot No."],
          // control1: item["Control1(Optional)"],
          // control2: item["Control2(Optional)"],
          // control3: item["Control3(Optional)"],
        })
      });
      this.setState({ printData })
    };
    if (rABS) {
      try {
        reader.readAsBinaryString(this.state.file);
      } catch (error) {
        console.log(error);
      }

    } else {
      try {
        reader.readAsArrayBuffer(this.state.file);
      } catch (error) {
        console.log(error);
      }

    };
  }

  renderUploadExcell = () => {

    const SheetJSFT = [
      "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
    ].map(function (x) { return "." + x; }).join(",");


    const className = 'btn btn-primary',
      filename = 'template',
      fields = {
        "Box ID": "Box ID",
        "Division Code": "Division Code",
        "Purchase Order": "Purchase Order",
        "Invoice No./ Delivery Order(DO) No.": "Invoice No./ Delivery Order(DO) No.",
        "Quantity": "Quantity",
        "Unit": "Unit",
        "Supplier Code": "Supplier Code",
        "Supplier Name": "Supplier Name",
        "Item Name": "Item Name",
        "Item Number": "Item Number",
        "MFG Lot No.": "MFG Lot No.",
        // "Control1(Optional)": "Control1(Optional)",
        // "Control2(Optional)": "Control2(Optional)",
        // "Control3(Optional)": "Control3(Optional)",
      },
      style = {
        padding: "5px"
      },
      excelData = [],
      text = "Download template";
    return (
      <div className='card card-primary'>
        <div className='card-header'>
          <h1 class="card-title">Upload excel</h1>
        </div>
        <div className='card-body'>
          <div className="form-group">

            <div className="input-group">
              <div className="custom-file">
                <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
                <label className="custom-file-label" id="fileLable" htmlFor="file">Upload an excel</label>
              </div>
              <div className="input-group-append">
                <button type='submit'
                  className='btn btn-primary'
                  onClick={this.handleFile} >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='card-footer'>
          <JsonToExcel
            data={excelData}
            className={className}
            filename={filename}
            fields={fields}
            style={style}
            text={text}
          />
        </div>
      </div>

    )
  }

  renderPrintMode = () => {
    return (
      <div className='card card-primary'>
        <div className='card-header'>
          <h3 class="card-title">Print mode</h3>
        </div>
        <div className='card-body'>
          <button className='btn btn-success'
            onClick={() => (this.props.history.push('/MaterialTag/create'))}
            disabled
            style={{ width: '48%', marginLeft: '1%', marginRight: '1%' }}>Label printer</button>
          <button className='btn btn-primary'
            onClick={() => (this.props.history.push('/MaterialTag/createA4'))}
            style={{ width: '48%', marginLeft: '1%', marginRight: '1%' }}>A4 printer</button>
        </div>
        <div className='card-footer'>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6" >
                <h1 class="m-0">Create material tag</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          {this.renderPrintMode()}
          <div className='card card-primary'>
            <div className='card-header'>
              <h3 class="card-title">Manual add material tag</h3>
            </div>
            <div className='card-body'>
              {this.renderTagInput()}
            </div>
            <div className='card-footer'>
              <button
                className='btn btn-primary'
                onClick={(e) => {
                  e.preventDefault()
                  this.addTag()
                }}
              >
                Add tag
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  this.setState({
                    printData: [],
                    unit: '',
                    boxID: '',
                    divisionCode: '',
                    purchaseOrder: '',
                    deliveryOrder: '',
                    quantity: 0,
                    supplierCode: '',
                    supplierName: '',
                    itemNumber: '',
                    itemName: '',
                    mfgLot: '',
                    // control1: '',
                    // control2: '',
                    // control3: '',
                  })
                }}
                className='btn btn-danger float-right'>
                Reset
              </button>
            </div>
          </div>
          {this.renderUploadExcell()}
          {this.renderPrintTab()}
        </section>
      </div>
    );
  }
}

export default CreateMaterialTag;
