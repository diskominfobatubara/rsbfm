@extends('layouts.app')
@section('content')
    <x-breadcrumb menu="{{ $menu }}"></x-breadcrumb>
    <x-datatable>
        <th style="width:5%">No</th>
        <th>Nama</th>
        <th>No HP</th>
        <th>Email</th>
        <th>Role</th>
        <th>Instansi</th>
        <th>Bidang / Bagian</th>
        <th>Foto</th>
        <th class="text-center" style="width: 10%">Action</th>
    </x-datatable>

    <x-ajaxModel size="modal-lg">
        <div class="form-group row">
            <div class="col-sm-6">
                <x-input type="text" name="name" label="Nama"></x-input>
            </div>
            <div class="col-sm-6">
                <x-input type="number" name="nohp" label="No Hp"></x-input>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-6">
                <x-input type="email" name="email" label="Email"></x-input>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-6">
                <x-input type="password" name="password" label="Password"></x-input>
            </div>
            <div class="col-sm-6">
                <x-input type="password" name="conf_password" label="Confirm Password"></x-input>
            </div>
        </div>
    </x-ajaxModel>

    <x-modalDelete></x-modalDelete>
@endsection
@section('script')
    <script>
        $(function() {
            $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
            });

            // Datatable
            var myTable = DataTable("{{ route('user.index') }}", [{
                    data: "DT_RowIndex",
                    name: "DT_RowIndex",
                },
                {
                    data: "name",
                    name: "name",
                },
                {
                    data: "nohp",
                    name: "nohp",
                },
                {
                    data: "email",
                    name: "email",
                },
                {
                    data: "role",
                    name: "role",
                },
                {
                    data: "action",
                    name: "action",
                    orderable: false,
                    searchable: false,
                }
            ]);

        });
    </script>
@endsection
